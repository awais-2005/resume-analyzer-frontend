import { Spinner } from "./Spinner";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  analyzing: boolean;
  buttonText: string;
}

export function AnalyzeButton({ onClick, disabled, analyzing, buttonText }: AnalyzeButtonProps) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-10 py-3.5 rounded-xl text-base font-semibold transition-all
          ${!disabled && !analyzing
            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {analyzing ? (
          <span className="flex items-center gap-2">
            <Spinner className="w-5 h-5 animate-spin" />
            {buttonText}
          </span>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
}
