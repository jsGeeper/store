import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@gogeepernpm/storybook/lib';
import { useSnackbar } from 'notistack';
import { removeAvatar, uploadAvatar } from '../../../../redux/slice/get-started/getStartedAction';
import { ROLES } from '../../../../utils/roles';
import { SimpleButton } from '../../../button/SimpleButton';
import { useUploadSingleFileToS3 } from '../../../../hooks/useUploadSingleFileToS3';
import { IRootReducerState } from '../../../../redux/IRootReducer';
import { initialize } from '../../../../redux/slice/auth/authAction';
import { updateDp } from '../../../../redux/slice/update-profile/profileUpdateAction';
import { set } from 'lodash';
import useStoreAvatar from '../../../../react-query/hooks/useStoreAvatar';
import useRemoveAvatar from '../../../../react-query/hooks/useRemoveAvatar';

interface IProps {
  user: any;
  showText?: boolean;
}

const DisplayImageUpload: React.FC<IProps> = ({ user, showText = true }: IProps) => {
  const [activeUser, setActiveUser] = React.useState(user);
  const [file, setFile] = React.useState(activeUser.avatar);
  const [isPreviewed, setIsPreviewed] = React.useState(false);
  const [fileObj, setFileObj] = React.useState(null);
  const { loading } = useSelector((state: IRootReducerState) => state.getStarted);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const roleMgr = user.role === ROLES.AGRIC_EXPERT ? 'expert' : 'farmer';

  const { mutate } = useStoreAvatar({});
  const { mutate: mutateRemover } = useRemoveAvatar();

  async function handleChange(e: any) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setIsPreviewed(true);
    setFileObj(e.target.files[0]);

    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    mutate(formData);
  }

  React.useEffect(() => {
    if (user.image) {
      setIsPreviewed(true);
    } else {
      setIsPreviewed(false);
    }
  }, [user]);

  const handleRemoveImage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // dispatch(removeAvatar({ id: user.id, role: roleMgr })).then(() => {
    //   enqueueSnackbar('Image Removed Successfully', { variant: 'success', autoHideDuration: 3000 });
    // });
    mutateRemover({});
    setFile(`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`);
  };

  return (
    <div className='imageUpload'>
      {loading && <Loader loading={loading} />}
      {showText && <span className='label text--md noLine'>Profile Picture</span>}
      <div className='uploadWrap'>
        <form encType='multipart/form-data' className='uploadForm'>
          <div className='upload__preview'>
            <img
              src={file || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
              alt='this-user-dp'
            />
          </div>
          <br />
          <div className='upload__control'>
            <div className='buttons'>
              <input
                type='file'
                accept='.jpg,.jpeg,.png'
                name='file-picker'
                id='file-picker'
                className='uploadInput'
                onChange={(e) => handleChange(e)}
              />

              <label htmlFor='file-picker' id='yourBtn' className='simpleButton mt-0'>
                {isPreviewed ? 'Upload New Image' : 'Upload Image'}
              </label>

              {(isPreviewed || user.avatar) && (
                <SimpleButton label='Remove' className='btn-outline-grey mt-0' onClick={handleRemoveImage} />
              )}
            </div>
            <br />
            <article className='footer-text'>
              <span className='text--sm'>You can upload jpg or png file.</span>
              <span className='text--sm'>Maximum size:2mb</span>
            </article>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisplayImageUpload;
