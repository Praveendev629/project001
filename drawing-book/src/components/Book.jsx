import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = forwardRef((props, ref) => {
    return (
        <div className="demoPage bg-white shadow-lg overflow-hidden h-full w-full relative" ref={ref}>
            <div className="h-full w-full flex flex-col">
                <div className="flex-grow flex items-center justify-center p-4 bg-[#fdfbf7]">
                    {props.children}
                </div>
                <div className="h-12 bg-[#fdfbf7] border-t border-gray-100 flex items-center justify-center text-gray-500 font-serif italic text-sm">
                    {props.number}
                </div>
            </div>
        </div>
    );
});

const Cover = forwardRef((props, ref) => {
    return (
        <div className="demoPage bg-[#2c1a0e] text-[#d4af37] h-full w-full flex flex-col items-center justify-center shadow-2xl border-r-4 border-[#1a0f08] p-8" ref={ref}>
            <h1 className="text-5xl font-serif text-center border-2 border-[#d4af37] p-8 tracking-widest uppercase">
                Drawing<br />Book
            </h1>
            <p className="mt-8 text-lg opacity-80 tracking-widest">L.K ARTS</p>
        </div>
    );
});


const Book = ({ images }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#2e2e2e] py-10 overflow-hidden relative">
            {/* Wooden Desk Texture Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-[#3e2723] opacity-100"></div>

            <HTMLFlipBook
                width={400}
                height={600}
                showCover={true}
                maxShadowOpacity={0.5}
                className="shadow-2xl"
            >
                <Cover />
                {images.map((img, index) => (
                    <Page number={img.name} key={img.id}>
                        <img src={img.link} alt={img.name} className="max-w-full max-h-full object-contain shadow-md" />
                    </Page>
                ))}
                <Page number="End">
                    <div className="h-full flex items-center justify-center text-gray-400">
                        The End
                    </div>
                </Page>
            </HTMLFlipBook>
        </div>
    );
};

export default Book;
