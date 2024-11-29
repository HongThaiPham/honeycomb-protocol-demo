"use client";
import React from "react";
import { Button } from "../ui/button";
import { useHoneycombProtocol } from "../providers/HoneycombProtocolProvider";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { useWallet } from "@solana/wallet-adapter-react";
import { db } from "@/lib/dexie";
import { toast } from "sonner";

const CreateProjectButton = () => {
  const { client } = useHoneycombProtocol();
  const wallet = useWallet();
  const handler = async () => {
    toast.promise(
      async () => {
        if (!wallet.publicKey || !client) {
          return;
        }
        try {
          const {
            createCreateProjectTransaction: {
              project: projectAddress,
              tx: txResponse,
            },
          } = await client.createCreateProjectTransaction({
            name: "My Project",
            authority: wallet.publicKey.toBase58()!,
            payer: wallet.publicKey.toBase58()!,
            profileDataConfig: {
              achievements: ["Gold Medal", "Silver Medal", "Bronze Medal"],
              customDataFields: ["Backpack", "Shoes", "Gloves"],
            },
          });

          console.log({ projectAddress, txResponse });

          const [response] = await sendClientTransactions(
            client, // The client instance you created earlier in the setup
            wallet, // The wallet you got from the useWallet hook
            txResponse // You can pass the transaction response containing either a single transaction or an array of transactions
          );
          if (response.responses[0].signature) {
            await db.projects.add({
              address: projectAddress,
              tx: response.responses[0].signature,
            });
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        loading: "Creating Project...",
        success: "Project Created",
        error: "Error Creating Project",
      }
    );
  };
  return <Button onClick={handler}>Create Project</Button>;
};

export default CreateProjectButton;
