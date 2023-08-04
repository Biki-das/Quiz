import { WrongCheckIcon } from "./Icons/WrongCheckIcon";

export function Modal({ setIsModalVisible, modalMessage }) {
  return (
    <div className="w-full h-full absolute flex justify-center items-center ">
      <div
        className={`w-[300px] relative h-[100px] border-4 bg-[#F7F5F1] flex justify-center items-center ${
          modalMessage === "empty" ||
          (modalMessage === "incorrect" && "border-red-600")
        } ${modalMessage === "success" && "border-green-600"}`}
      >
        <button
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => {
            setIsModalVisible(false);
          }}
        >
          <WrongCheckIcon />
        </button>
        {modalMessage === "empty" && (
          <p className="text-center text-red-600">Please fill the answer</p>
        )}
        {modalMessage === "success" && (
          <p className="text-center text-green-600">Correct answer</p>
        )}
        {modalMessage === "incorrect" && (
          <p className="text-center text-red-600">Wrong answer</p>
        )}
      </div>
    </div>
  );
}
