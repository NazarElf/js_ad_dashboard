import React from "react";


function Home() {
    return (
        <>
            <div className="container mx-auto text-center flex flex-col-reverse gap-10 lg:flex-row items-center mt-10 shadow-3xl p-10 bg-slate-950/50 rounded-xl">
                <div>
                    <h1 className="">Optimize Your Ad Campaigns</h1>
                    <p className="mt-10 text-xs lg:text-sm text-yellow-800">Next paragraph created with AI... I just had to come up with some text</p>
                    <p className="">This website provides powerful tools for tracking and analyzing your advertising performance. With real-time insights, customizable dashboards, and AI-powered recommendations, our platform helps you understand and enhance your ad campaigns across multiple platforms. Measure ROI, discover audience behavior, and stay ahead of the competition with detailed performance reports and automated reporting. Unlock the full potential of your advertising with this website.</p>
                </div>
                <img className="xl:max-w-[60%] lg:max-w-[40%] lg:max-h-full max-h-[30vh] object-cover object-left shadow-sm rounded-3xl self-stretch" src='./assets/code.jpg' alt="img"/>
            </div>
        </>
    )
}

export default Home;