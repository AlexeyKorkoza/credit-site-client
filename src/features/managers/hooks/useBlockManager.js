import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { store } from 'react-notifications-component';

import { useInitForm } from '../../../core';
import { blockManager } from '../api';
import { notification } from '../../../services';
import { blockManagerSchema } from '../validation';

const failureNotificationType = 'FailureEditingManager';
const successfulNotificationType = 'SuccessfulEditingManager';

/**
 * @param isBlocked {Boolean}
 * @return {Array}
 */
const useBlockManager = isBlocked => {
  const [useFormProps] = useInitForm({
    validationSchema: blockManagerSchema,
    defaultValues: {
      isBlocked,
    },
  });
  const { setValue } = useFormProps;
  const { id: managerId } = useParams();

  useEffect(() => {
    setValue('isBlocked', isBlocked);
  }, [isBlocked]);

  const handleBlockingManager = useCallback(
    data => {
      blockManager(+managerId, data.isBlocked)
        .then(() => {
          const message = 'Manager was updated successfully';
          const builtNotification = notification.buildNotification(
            message,
            successfulNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
        })
        .catch(error => {
          const { message } = error;
          const builtNotification = notification.buildNotification(
            message,
            failureNotificationType,
          );
          if (builtNotification) {
            store.addNotification(builtNotification);
          }
        });
    },
    [managerId],
  );

  return [handleBlockingManager, useFormProps];
};

export default useBlockManager;
