import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Multi() {
  // const Card =[].map( () => {
  //   return <div className="bg-white mx-2">Hello</div>;
  // });
  const cards = [1, 2, 3, 4, 5, 6, 7].map((_) => {
    return (
      <div className="bg-white/40 rounded-md mx-8 h-[200px]" key={_}>
        {_}
      </div>
    );
  });
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="m-auto">
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-4-px"
      >
        {cards}
      </Carousel>
    </div>
  );
}