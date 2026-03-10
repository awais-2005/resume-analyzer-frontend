interface UploadZoneProps {
  file: File | null;
  dragActive: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
}

export function UploadZone({ file, dragActive, inputRef, handleDrag, handleDrop, handleChange, removeFile }: UploadZoneProps) {
  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
        ${dragActive
          ? "border-emerald-500 bg-emerald-50"
          : file
            ? "border-emerald-400 bg-emerald-50/50"
            : "border-gray-200 bg-gray-50/50 hover:border-emerald-300 hover:bg-emerald-50/30"
        }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="hidden"
      />

      {!file ? (
        <>
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-700 font-medium">
            Drag & drop your resume here
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or <span className="text-emerald-600 font-medium">browse files</span>
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Supports PDF, DOC, DOCX (max 10MB)
          </p>
        </>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-gray-800 font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); removeFile(); }}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
