import { ManifestoPanelLayout } from "features/Manifesto/ManifestoPanel/ManifestoPanelLayout";
import { openTwitterTweetIntent } from "features/Manifesto/ManifestoPanel/ManifestoPanelSigned/twitter";
import { FullAccount, SiweToken } from "features/Manifesto/types";
import { css } from "linaria";
import React, { useState } from "react";
import {
  bodyDarkGreen40,
  bodyDarkGreen60,
  bodyLightOffWhite,
} from "shared/styles/colors";
import { quincy36 } from "shared/styles/font-palette";
import {
  bodySmallSegment18,
  buttonLabelQuincy18,
  labelLetterSpacing,
} from "shared/styles/fonts";
import {
  buttonBlockPadding,
  buttonBorderRadius,
  buttonInlinePadding,
} from "shared/styles/lengths";
import { buttonShadow } from "shared/styles/shadows";
import { AfterSignStep } from "./AfterSignStep";
import { ClaimDiscordRole } from "./ClaimDiscordRole";
import { TwitterLogo } from "./TwitterLogo";

export function ManifestoPanelSigned({
  account,
  signedMessage,
}: {
  account: FullAccount;
  signedMessage: SiweToken;
}) {
  const [hasTweeted, setHasTweeted] = useState(false);

  if (!hasTweeted) {
    return (
      <ManifestoPanelLayout
        icon={
          <img width="44" height="44" src={require("./icon-gift.svg")} alt="" />
        }
        title={<>Don&rsquo;t forget about the surprise gift!</>}
      >
        <div
          className={css`
            display: flex;
            flex-flow: column;
            gap: 1.5rem;
            align-items: center;
            margin: auto;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-flow: column;
              gap: 0.5rem;
              align-items: center;
            `}
          >
            <TwitterLogo />
            <p
              className={css`
                font: ${bodySmallSegment18};
                color: ${bodyDarkGreen60};
              `}
            >
              Tweet your signature to be eligible for future surprises.
            </p>
          </div>
          <TwitterShareButton
            onShareBegin={() => {
              setHasTweeted(true);
            }}
            account={account}
            signedMessage={signedMessage}
          />
        </div>
        <button
          className={css`
            align-self: center;
            border: none;
            font: ${bodySmallSegment18};
            color: ${bodyDarkGreen40};
            background: none;
            cursor: pointer;
            margin: 0 0 3rem;
          `}
          onClick={() => {
            setHasTweeted(true);
          }}
        >
          skip step
        </button>
      </ManifestoPanelLayout>
    );
  }

  return (
    <ManifestoPanelLayout
      icon={
        <span
          className={css`
            font: ${quincy36};
          `}
        >
          🎉
        </span>
      }
      title={<>Wohoooo! Welcome to the community!</>}
      support={
        <>
          You can now tweet your signature and claim the special 🔏Verified
          Signer role in our Discord! 👇
        </>
      }
      topRight={
        <div
          className={css`
            display: flex;
            align-items: center;
            font: ${bodySmallSegment18};
            font-weight: 700;
            color: ${bodyDarkGreen60};
          `}
        >
          <img
            width="24"
            height="24"
            src={require("./icon-connected.svg")}
            alt=""
          />
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </div>
      }
    >
      <div
        className={css`
          background: bottom / 100% no-repeat url(./hero.png);
          min-height: 32rem;
        `}
      />
      <div
        className={css`
          display: grid;
          grid: auto / 1fr 1rem 1fr;
          gap: 2rem;
          margin: 4rem;
        `}
      >
        <AfterSignStep
          title={<TwitterLogo />}
          subTitle={
            <>Tweet your signature to be eligible for future surprises.</>
          }
        >
          <TwitterShareButton account={account} signedMessage={signedMessage} />
        </AfterSignStep>
        <hr
          className={css`
            border: none;
            background: top / auto no-repeat url(divider.svg);
            min-height: 18rem;
          `}
        />
        <ClaimDiscordRole account={account} />
      </div>
      <p
        className={css`
          font: ${bodySmallSegment18};
          color: ${bodyDarkGreen60};
          margin: 0 2rem 2rem;
          text-align: center;
        `}
      >
        Your Twitter and Discord accounts will NOT be linked to your Ethereum
        address.
      </p>
    </ManifestoPanelLayout>
  );
}

function TwitterShareButton({
  onShareBegin = () => {},
  account,
  signedMessage,
}: {
  onShareBegin?: () => void;
  account: FullAccount;
  signedMessage: SiweToken;
}) {
  return (
    <button
      className={css`
        background: #3a90e9;
        padding: ${buttonBlockPadding} ${buttonInlinePadding};
        border: none;
        border-radius: ${buttonBorderRadius};
        font: ${buttonLabelQuincy18};
        letter-spacing: ${labelLetterSpacing};
        color: ${bodyLightOffWhite};
        box-shadow: ${buttonShadow};
        cursor: pointer;
      `}
      onClick={() => {
        openTwitterTweetIntent({
          text: [
            `I am a happy doggo @tallycash #doggo`,
            ``,
            `sig: ${signedMessage.signature}`,
            ``,
          ].join(`\n`),
          url: `https://twitter.com/TallyCash/status/1428070907566755844`,
        });
        onShareBegin();
      }}
    >
      Share on Twitter
    </button>
  );
}