import { useState } from 'react';
import { uploadFile } from 'react-s3';

import { aws_config } from '../utils/aws_config';

window.Buffer = window.Buffer || require('buffer').Buffer;

export const useUploadSingleFileToS3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uri, setUri] = useState(null);

  const upload = async (file: any) => {
    setIsLoading(true);

    uploadFile(file, aws_config)
      .then((data: any) => {
        setIsLoading(false);
        setUri(data.location);
      })
      .catch((err: any) => console.error(err));
  };
  return {
    upload,
    isLoading,
    uri
  };
};
