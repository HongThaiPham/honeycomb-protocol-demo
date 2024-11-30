"use client";
import React from "react";
import { useHoneycombProtocol } from "../providers/HoneycombProtocolProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { db } from "@/lib/dexie";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
type Props = {
  projectAddress: string;
};
const CreateUserButton: React.FC<Props> = ({ projectAddress }) => {
  const [loading, setLoading] = React.useState(false);
  const { client } = useHoneycombProtocol();
  const wallet = useWallet();
  const handler = async () => {
    toast.promise(
      async () => {
        if (!wallet.publicKey || !client) {
          return;
        }
        setLoading(true);
        try {
          const user = await client
            .findUsers({
              wallets: [wallet.publicKey.toString()],
            })
            .then(({ user: [user] }) => user);
          console.log({ user });
          if (!user) {
            const { createNewUserWithProfileTransaction: txResponse } =
              await client.createNewUserWithProfileTransaction({
                project: projectAddress,
                wallet: wallet.publicKey.toString(),
                profileIdentity: wallet.publicKey.toString(),
                userInfo: {
                  name: "Leo",
                  bio: "I am a developer",
                  pfp: "https://lh3.googleusercontent.com/-Jsm7S8BHy4nOzrw2f5AryUgp9Fym2buUOkkxgNplGCddTkiKBXPLRytTMXBXwGcHuRr06EvJStmkHj-9JeTfmHsnT0prHg5Mhg",
                },
              });

            console.log({ txResponse });

            const [response] = await sendClientTransactions(
              client, // The client instance you created earlier in the setup
              wallet, // The wallet you got from the useWallet hook
              txResponse // You can pass the transaction response containing either a single transaction or an array of transactions
            );

            if (response.responses[0].signature) {
              await db.logs.add({
                projectAddress,
                authority: wallet.publicKey.toString(),
                title: "CreateUserAndProfile",
                address: wallet.publicKey.toString(),
                tx: response.responses[0].signature,
              });
            }

            console.log(response);
          } else {
            toast.info("User already exists");
          }
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      {
        loading: "Creating User and profile",
        success: "User and profile created",
        error: "Failed to create User and profile",
      }
    );
  };
  return (
    <Button onClick={handler} disabled={loading}>
      {loading ? <Loader2 className="animate-spin mr-2" /> : null}
      Create User and profile
    </Button>
  );
};

export default CreateUserButton;
