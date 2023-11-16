import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import image1 from "../../assets/Landing-Page-Avatar.png";
import image2 from "../../assets/Relax.jpg";
import image3 from "../../assets/market-place.jpg";
import image4 from "../../assets/stage.png";
import { Link } from "react-router-dom";
import Multi from "./Multi";

const HeroSection = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const FlexContainer = ({
    card_url,
    text,
    title,
  }: {
    card_url: string;
    text: string;
    title: string;
  }) => {
    return (
      <div className="py-3 md:py-8 w-full  space-y-2 md:space-y-4">
        <div className=" ">
          <img
            src={require(`../../assets/${card_url}`)}
            alt="showcase img"
            width={900}
            height={600}
            style={{
              height: "25vh",
              objectFit: "cover",
              backgroundPosition: "center",
              zIndex: 0,
              borderRadius: "10px",
            }}
            className="hover:scale-105 transition-all duration-500"
          />
        </div>
        <h2 className="font-semibold text-[24px]">{title}</h2>
        <p className="text-[17px] text-gray-500 font-normal">{text}</p>
        <button className=" text-start font-semibold text-gray-600 w-full  py-1  hover:text-gray-500/70 rounded-md">
          Learn More
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1">
      <div className="bg-whie h-[60vh]">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          swipeable={true}
          draggable={false}
          showDots={true}
          ssr={true} // means to render carousel on server-side.
          autoPlaySpeed={6000}
          keyBoardControl={true}
          customTransition="all 5"
          transitionDuration={100}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div className="relative h-[60vh]">
            <img
              src={image1}
              alt=""
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                backgroundPosition: "center",
                position: "absolute",
                zIndex: 0,
              }}
            />
            <div className="hidden h-[60vh] z-10 absolute top-0 w-full md:flex flex-col items-end text-right p-20 pt-[100px]">
              <p className="text-white text-[45px] max-w-[400px] leading-20  mb-2">
                Work for the Biggest{"  "}
                <span className="text-bm_card__orange">Brands</span>
              </p>
              <Link
                to={"/auth/signup"}
                // href={'/auth/signin'}

                className="bg-bm__btn__grey text-white px-6 py-3 rounded mx-2  hover:bg-white hover:text-bm__btn__grey"
              >
                Create account
              </Link>
            </div>
            <div className="h-[60vh]  z-10 absolute top-0 w-full md:hidden flex items-end p-6 md:p-20">
              <p className="text-white text-xl md:text-[60px] max-w-[400px] leading-20  mb-2">
                Work for <br /> the Biggest{"  "}
                <span className="text-bm_card__orange">Brands</span>
              </p>
            </div>
          </div>
          <div className="relative h-[60vh]">
            <img
              src={image2}
              alt=""
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                backgroundPosition: "center",
                position: "absolute",
                zIndex: 0,
              }}
            />
            <div className="hidden  h-[60vh] z-10 absolute top-0 w-full md:flex flex-col items-start justify-start text-right p-20 pt-[100px]">
              <p className="text-white text-[45px]  leading-20  text-start">
                It is easy to start
                {"  "}
                <span className="text-bm_card__orange">earning</span>
                {"  "}
                money on a project
              </p>
              <Link
                to={"/auth/signup"}
                className="bg-bm__btn__grey text-white px-6 py-3 rounded my-6  hover:bg-white hover:text-bm__btn__grey"
              >
                Join the talent pool
              </Link>
            </div>
          </div>
          <div className="relative h-[60vh]">
            <img
              src={image3}
              alt=""
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                backgroundPosition: "center",
                position: "absolute",
                zIndex: 0,
                // opacity: 20,
              }}
              className="blur-sm"
            />
            <div className="hidden bg-black/70   h-[60vh] z-10 absolute top-0 w-full md:flex flex-col items-center justify-end text-right p-20 pt-[100px]">
              <p className="text-white text-[45px]  leading-20  text-center">
                The right talent can grow your{"  "}
                <span className="text-bm_card__orange">products</span>
                {"  "}
                across the mass pool of consumers
              </p>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="py-20 px-4 pb-4  md:px-12 xl:px-40">
        <div className="text-[25px] md:text-[45px] font-semibold">
          Creating success stories together
        </div>
        <div className="text-[18px] font-normal mt-2">
          Connecting independent talent with ideal opportunities and agencies
          with the finest fit
        </div>
        <div className="flex flex-col p-4 md:flex-row justify-between gap-12 items-start py-10">
          <FlexContainer
            card_url="Landing-Page-Avatar2.jpg"
            text={
              "Join, where your skills meet opportunities! Sign up for free, showcase your expertise to our global audience, deliver outstanding work and get paid on time, every time. It is that simple. Start your journey to success with us"
            }
            title="Talent"
          />
          <FlexContainer
            card_url="joint.jpg"
            text="Need young and experienced talent for your next project? Look no further! We connect our large network of brand ambassadors, ushers etc. with  a community of clients offering seamless scalability, tailored to your needs. Experience unmatched integrity, professionalism, and communication with every talent you hire. Your perfect matches are just a click away!"
            title="Agency"
          />
        </div>
      </div>
      <div className="w-full bg-black/70  relative  min-h-[400px]">
        <img
          src={image4}
          alt=""
          width={1440}
          height={800}
          style={{
            objectFit: "cover",
            backgroundPosition: "center",
            position: "absolute",
            zIndex: 0,
          }}
          className=" min-h-[400px] md:max-h-[400px] w-full bg-black/90 grayscale"
        />
        <div className="pt-28">
            <Multi />
        </div>
      </div>
      <div className='relative '></div>
    </div>
  );
};

export default HeroSection;
