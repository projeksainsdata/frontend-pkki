import React, { useState } from 'react';
import Footer from './Footer'
import faqData from './FaqData';

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <div className="md:mx-20">
        <div className="flex flex-col md:flex-row mt-20 px-4">
            <div className="w-full md:w-[450px] mb-4 md:mb-0">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer border p-[23px] font-bold ${selectedCategory === index ? 'bg-colorGreen text-colorItera border' : 'text-black'}`}
                        onClick={() => setSelectedCategory(index)}
                    >
                        <h2 className="text-lg font-spaceGrotesk">{faq.category}</h2>
                    </div>
                ))}
            </div>
            <div className="w-full md:w-3/4 md:pl-2">
                {selectedCategory !== null && faqData[selectedCategory].questions.map((faq, index) => (
                    <div key={index}>
                        <div
                            className="flex justify-between text-lg items-center cursor-pointer bg-colorGreen p-[6px]"
                            onClick={() => toggleFAQ(index)}>
                            <h3 className="text-md font-medium text-white font-spaceGrotesk p-2">{faq.question}</h3>
                            <button className="text-2xl px-2 text-white">{activeIndex === index ? '-' : '+'}</button>
                        </div>
                        <hr />
                        {activeIndex === index && (
                            <div className="bg-black font-spaceGrotesk px-4 py-7 text-white text-sm p-[20px]">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  );
};

export default FAQ;
