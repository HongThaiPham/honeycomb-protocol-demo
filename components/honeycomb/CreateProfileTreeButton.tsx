"use client";
import React from "react";
import { useHoneycombProtocol } from "../providers/HoneycombProtocolProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { db } from "@/lib/dexie";
type Props = {
  projectAddress: string;
};
const CreateProfileTreeButton: React.FC<Props> = ({ projectAddress }) => {
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
          const {
            createCreateProfilesTreeTransaction: { tx: txResponse },
          } = await client.createCreateProfilesTreeTransaction({
            project: projectAddress,
            payer: wallet.publicKey.toString(),
            treeConfig: {
              basic: {
                numAssets: 10,
              },
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
              authority: wallet.publicKey.toString(),
              tx: response.responses[0].signature,
              title: "CreateProfileTree",
              address: "",
              projectAddress,
            });
          }

          console.log(response);
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
      {
        loading: "Creating Profile Tree...",
        success: "Profile Tree Created",
        error: "Error Creating Profile Tree",
      }
    );
  };
  return (
    <Button onClick={handler} disabled={loading}>
      {loading ? <Loader2 className="animate-spin mr-2" /> : null}
      Create profile tree
    </Button>
  );
};

export default CreateProfileTreeButton;
