import hero from "../assets/images/hero2-01.png";

const BannerCustom = ({name}) => {
    return (
        <div className="relative -mt-[180px] md:-mt-[200px] z-[-99]">
            <img src={hero} alt="hero" className="object-cover w-full md:h-[25em] h-[30em] absolute" loading="lazy" />
            <div className="bannerContent flex flex-col items-center justify-end z-10 relative font-bold font-plusJakarta px-20 h-[30em] md:h-[25em] pb-10">
                <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-4xl text-white mb-10 text-center">
                    {name}
                </h1>
            </div>
        </div>
    );
};

export default BannerCustom;