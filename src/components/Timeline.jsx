import React from "react";

const hakiTypes = [
  {
    title: "Hak Cipta",
    description:
      "Hak eksklusif yang diberikan kepada pencipta atas karya orisinalnya dalam bidang ilmu pengetahuan, seni, dan sastra. Termasuk buku, musik, tulisan, karya ilmiah, program komputer, dan lainnya.",
  },
  {
    title: "Paten & Paten Sederhana",
    description:
      "Paten melindungi invensi teknis berupa produk atau proses yang baru, inventif, dan dapat diterapkan secara industri. Paten sederhana mencakup invensi yang lebih sederhana dan proses perbaikan dari yang sudah ada.",
  },
  {
    title: "Desain Industri",
    description:
      "Perlindungan terhadap kreasi bentuk, konfigurasi, atau komposisi garis dan warna yang memberikan kesan estetis pada produk industri atau kerajinan tangan.",
  },
];

const JenisHaki = () => {
  return (
    <div className="bg-gradient-to-b from-[#121212] to-[#6963ac] to-[900%] rounded-t-2xl md:rounded-t-[80px] font-spaceGrotesk px-5 py-16 md:px-20">
      <h1 className="text-colorItera text-center text-3xl md:text-4xl font-bold mb-12">
        Jenis Hak Kekayaan Intelektual (HKI)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hakiTypes.map((item, index) => (
          <div
            key={index}
            className="bg-[#181818] border border-[#525252] rounded-xl p-6 text-white shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold mb-3 text-colorItera">
              {item.title}
            </h2>
            <p className="font-plusJakarta text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JenisHaki;
