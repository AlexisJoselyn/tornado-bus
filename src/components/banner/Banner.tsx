import bannerImage from '../../assets/banner.png';

export const Banner = () => {
  return (
    <div className="relative w-full h-80 md:h-80 lg:h-96 -mb-8">
      <img
        src={bannerImage}
        alt="Promoción de viajes"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

