import { Button, Switch, Form, Input, notification, Layout, Tooltip, Space } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../../hooks";
import { Address } from "../../components";
import { Messages } from "./";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EthCrypto from "eth-crypto";

const { TextArea } = Input;
const { Content } = Layout;

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Messenger({ address, tx, provider, readContracts, writeContracts, credentials, userMessages }) {
  const { contactAddress } = useParams();
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState(false);

  const handleMessageChange = event => {
    // 👇️ access textarea value
    setMessage(event.target.value);
  };

  const [sentMessages, setSentMessages] = useLocalStorage("sentMessages", { [contactAddress]: [] });
  const [receivedMessages, setReceivedMessages] = useLocalStorage("receivedMessages", { [contactAddress]: [] });

  useEffect(() => {
    if (!sentMessages[contactAddress]) {
      setSentMessages(Object.assign({}, sentMessages, { [contactAddress]: [] }));
    }
    if (!receivedMessages[contactAddress]) {
      setReceivedMessages(Object.assign({}, receivedMessages, { [contactAddress]: [] }));
    }
    checkAddressRegistered();
  }, [contactAddress]);

  const processRecievedMessages = async () => {
    let formatted = { [contactAddress]: [] };
    if (userMessages && userMessages.length > 0) {
      for (let m of userMessages) {
        const block = await provider.getBlock(m.blockNumber);
        const rMessage = {
          message: m.message,
          to: m.to,
          from: m.from,
          blockNumber: m.blockNumber,
          timestamp: block.timestamp,
        };
        try {
          const message = await EthCrypto.decryptWithPrivateKey(
            credentials.privKey, // privateKey
            JSON.parse(m.message),
          );
          rMessage.message = message;
        } catch (e) {}
        if (formatted[rMessage.from]) {
          formatted[rMessage.from].push(rMessage);
        } else {
          Object.assign({}, formatted, { [rMessage.from]: [rMessage] });
        }
      }
    }
    setReceivedMessages(Object.assign({}, receivedMessages, formatted));
  };

  useEffect(() => {
    processRecievedMessages();
  }, [userMessages]);

  const checkAddressRegistered = async () => {
    const recipient = contactAddress;
    const recipientPubKey = await readContracts["EthereumInstantMessenger"].getUserPubKey(recipient);
    const recipientRegistered = recipientPubKey !== "";
    setEncrypted(recipientRegistered);
    return recipientRegistered;
  };

  useEffect(() => {
    checkAddressRegistered();
  }, [receivedMessages]);

  const sendMessage = async () => {
    let preparedMessage = message;
    let recipientEncrypted = encrypted;
    if (!recipientEncrypted) {
      recipientEncrypted = await checkAddressRegistered();
    }
    if (recipientEncrypted) {
      // get public key of recipient
      const recipientPubKey = await readContracts["EthereumInstantMessenger"].getUserPubKey(contactAddress);
      if (recipientPubKey === "") {
        // show user that reciepient is not registered. Advise them to send unencrypted message telling recipient to register.
        notification.error({
          message: "Recipient Is Not Registered",
          description: "Send them an unencrypted message telling them to register!",
          placement: "bottomRight",
        });
        return;
      }
      // encrypt with recipients public key
      preparedMessage = await EthCrypto.encryptWithPublicKey(
        recipientPubKey, // publicKey
        message, // message
      );
    }
    const result = tx(
      writeContracts.EthereumInstantMessenger.sendMessage(
        contactAddress,
        recipientEncrypted ? JSON.stringify(preparedMessage) : preparedMessage,
        recipientEncrypted,
      ),
      async update => {
        console.log("📡 Transaction Update:", update);
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" 🍾 Transaction " + update.hash + " finished!");
          console.log(
            " ⛽️ " +
              update.gasUsed +
              "/" +
              (update.gasLimit || update.gas) +
              " @ " +
              parseFloat(update.gasPrice) / 1000000000 +
              " gwei",
          );

          const block = await provider.getBlock();

          setSentMessages(
            Object.assign({}, sentMessages, {
              [contactAddress]: sentMessages[contactAddress].concat({
                from: address,
                to: contactAddress,
                blockNumber: block.number,
                timestamp: block.timestamp,
                message,
              }),
            }),
          );
          setMessage("");
        }
      },
    );
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  };

  return (
    <Layout style={{ margin: 10 }}>
      <Content
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1" }} />

        <Address address={contactAddress} fontSize={16} />
        <div
          style={{ flex: "1", display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "flex-end" }}
        >
          <p style={{ paddingRight: 5 }}>Encryption: </p>
          <Switch disabled={true} checked={encrypted} checkedChildren="ON" unCheckedChildren="OFF" />
          <Tooltip
            placement="topRight"
            title={`Address ${encrypted ? "is" : "has not"} registered to receive encrypted messages.`}
          >
            <InfoCircleOutlined style={{ marginLeft: 5 }} />
          </Tooltip>
        </div>
      </Content>
      <Content style={{ maxHeight: 600, marginBottom: 10 }}>
        {receivedMessages[contactAddress] ? (
          <Messages
            sentMessages={sentMessages}
            receivedMessages={receivedMessages}
            address={address}
            contactAddress={contactAddress}
          />
        ) : (
          ""
        )}
      </Content>
      <Content>
        <Space direction="horizontal">
          <TextArea rows={3} id="message" name="message" value={message} onChange={handleMessageChange} />
          <Button onClick={sendMessage}>Send</Button>
        </Space>
      </Content>
    </Layout>
  );
}

export default Messenger;
