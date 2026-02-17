import React from "react"

export default function Features() {
  const features = [
    {
      tag: "Multi-device",
      title: "No special hardware needed",
      description:
        "With Vultisig, you bring your own trusted devices - phone, desktop, laptops or tablets. No special hardware needed. Together, your devices create vaults that no single device can access.",
    },
    {
      tag: "Vault Share",
      title: "Vault Shares = secure backups",
      description: (
        <p>
          Each device has a unique backup called "Vault Share", which are secure
          digital backups that eliminate the hassle of physical storage.
          <br />
          <span className="text-primaryAccent">
            <strong>Individual Vault-shares never store funds</strong> and can
            be safely imported/exported anywhere.
          </span>
        </p>
      ),
    },
    {
      tag: "Multi-Factor",
      title: "Private keys never exist in Vultisig",
      description:
        "Each vault is natively multi-factor. No assets can be accessed without collaboration. Access them remotely from anywhere in the world. Store each device's Vault Share separately and sleep soundly.",
    },
  ]
  return <div>Features</div>
}
