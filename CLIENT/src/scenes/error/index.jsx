import { Link } from "react-router-dom";

const ErrorPage = ({ data }) => {
  return (
    <>
      <div
        id="logo-cont"
        className="inline-block relative text-[24px] font-extrabold italic left-1/2 -translate-x-1/2 mt-[12px]"
      >
        <span className="text-gray-300 px-[1px]">Algo</span>
        <span className="text-white">Savy</span>
      </div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 text-center ">
        <div className="">
          <h1 className="text-gray-300 text-[34px] font-bold mb-[30px]">
            {data.header}
          </h1>
          <p className="text-text_2 text-[14px] max-w-[350px] mb-[20px]">
            {data.message}
          </p>
          {data.links !== undefined &&
            data.links.length !== 0 &&
            data.links.map((elem, idx) => (
              <Link
                key={idx}
                to={elem.link_path}
                className="text-teal-500 hover:text-gray-600 text-[14px] block w-fit mx-auto"
              >
                {elem.text}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
