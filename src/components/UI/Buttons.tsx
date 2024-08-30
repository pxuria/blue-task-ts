interface ButtonsProps {
  nextStep: () => void;
  backStep?: () => void;
  submit?: boolean;
}

const Buttons: React.FC<ButtonsProps> = ({ nextStep, backStep, submit }) => {
  return (
    <div className="flex items-center justify-start w-full mt-4 gap-4">
      <button onClick={nextStep} type={`${submit ? "submit" : "button"}`} className="next-btn">
        {`${submit ? "افزودن تسهیلات" : "ادامه"}`}
      </button>
      {backStep && (
        <button onClick={backStep} type="button" className="back-btn">
          صفحه قبل
        </button>
      )}
    </div>
  );
};

export default Buttons;
