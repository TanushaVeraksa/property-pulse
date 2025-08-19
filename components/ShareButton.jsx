import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TelegramShareButton
          url={shareUrl}
          title={`${property.name} #${property.type.replace(/\s/g, "")}ForRent`}
        >
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={`${property.name}`}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
