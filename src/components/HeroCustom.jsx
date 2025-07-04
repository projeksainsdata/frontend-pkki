import hero from "../assets/images/hero2-01.png";

const BannerCustom = ({name}) => {
    return (
        <div className="relative -mt-[180px] md:-mt-[200px] z-[-99]">
            <img src={hero} alt="hero" className="object-cover w-full md:h-[25em] h-[30em] absolute" loading="lazy" />
            <div className="bannerContent flex flex-col z-10 relative font-bold md:mt-10 font-plusJakarta px-20">
                <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-4xl md:pt-[240px] text-white pt-[285px] mb-10 px-20">
                    {name}
                </h1>
            </div>
        </div>
    );
};

export default BannerCustom;