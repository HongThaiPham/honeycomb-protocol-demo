"use client";

import React from "react";
import { Button } from "../ui/button";
import { useHoneycombProtocol } from "../providers/HoneycombProtocolProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { getUnixTime, addMinutes } from "date-fns";
import { BadgesCondition } from "@honeycomb-protocol/edge-client";
import { sendClientTransactions } from "@honeycomb-protocol/edge-client/client/walletHelpers";
import { db } from "@/lib/dexie";
type Props = {
  projectAddress: string;
};
const CreateBadgeButton: React.FC<Props> = ({ projectAddress }) => {
  const { client } = useHoneycombProtocol();
  const wallet = useWallet();
  const handler = async () => {
    if (!wallet.publicKey || !client) {
      return;
    }
    try {
      const badgeIndex = await db.projectBadges
        .where({
          projectAddress,
        })
        .count();
      const { createInitializeBadgeCriteriaTransaction: txResponse } =
        await client.createInitializeBadgeCriteriaTransaction({
          args: {
            authority: wallet.publicKey.toString(),
            projectAddress: projectAddress,
            endTime: getUnixTime(addMinutes(Date.now(), 5)),
            startTime: getUnixTime(addMinutes(Date.now(), 1)),
            badgeIndex,
            condition: BadgesCondition.Public,
          },
        });

      console.log({ txResponse });

      const [response] = await sendClientTransactions(
        client, // The client instance you created earlier in the setup
        wallet, // The wallet you got from the useWallet hook
        txResponse // You can pass the transaction response containing either a single transaction or an array of transactions
      );

      if (response.responses[0].signature) {
        await db.projectBadges.add({
          projectAddress,
          badgeId: badgeIndex,
          tx: response.responses[0].signature,
        });
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return <Button onClick={handler}>Create Badge</Button>;
};

export default CreateBadgeButton;
