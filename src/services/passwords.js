import buildNotification from './notification';

/**
 * @param {String} oldPassword
 * @param {String} newPassword
 * @param {String} confirmNewPassword
 * @return {null|*}
 */
const validatePasswords = (oldPassword, newPassword, confirmNewPassword) => {
    const failureNotificationType = 'FailureChangingPassword';

    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return buildNotification('Please, enter fill in all fields', failureNotificationType);
    }

    if (oldPassword.length < 8 || newPassword.length < 8 || confirmNewPassword.length < 8) {
        return buildNotification('Passwords length must be as minimum 8 symbols', failureNotificationType);
    }

    if (newPassword !== confirmNewPassword) {
        return  buildNotification('Passwords are not equal', failureNotificationType);
    }

    return null;
};

export default {
    validatePasswords,
};
