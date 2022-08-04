import React, { useRef } from 'react';

interface Props {
    children: React.ReactElement;
    extensions: string[];
    onChange: (form) => void;
    onError: (message) => void;
    maxSize?: number;
}

export const FileUpload: React.FC<Props> = ({ children, onChange, onError, extensions, maxSize = 5 }) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const handleUpload = (evt) => {
        const singleFile = evt.target.files[0];
        // make sure a file was provided in the first place
        if (!singleFile) {
            onError('Failed to upload a file.');
            return;
        }

        // if we care about file extensions
        if (extensions) {
            const uploadedFileExt = singleFile.name.split('.').pop().toLowerCase();
            const isValidFileExt = extensions.map((ext) => ext.toLowerCase()).includes(uploadedFileExt);

            if (!isValidFileExt) {
                onError(`Must upload a file of type: ${extensions.join(' or ')}`);
                return;
            }
        }

        // convert maxSize from megabytes to bytes
        const maxBytes = maxSize * 1000000;

        if (singleFile.size > maxBytes) {
            onError(`File size must be less than ${maxSize} MB.`);
            return;
        }

        // return native file object
        onChange(singleFile);
    };

    return (
        <div data-testid="fileUpload">
            <input
                aria-label="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleUpload}
                ref={uploadRef}
            />
            {React.cloneElement(children, {
                onClick: () => uploadRef?.current?.click(),
            })}
        </div>
    );
};

export default FileUpload;
