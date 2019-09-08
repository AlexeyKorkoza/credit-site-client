const failureNotificationSettings = {
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
};

const successNotificationSettings = {
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 3000 },
    dismissable: { click: true }
};

const executeBuildingNotification = (message, title, isSuccess) =>
    isSuccess
        ? buildSuccessNotificationSettings(message, title)
        : buildFailureNotificationSettings(message, title);

const buildFailureNotificationSettings = (message, title) => {
    return Object.assign({}, failureNotificationSettings, { message, title });
};

const buildSuccessNotificationSettings = (message, title) => {
    return Object.assign({}, successNotificationSettings, { message, title });
};

const types = [
    {
        isSuccess: false,
        title: "You could not sign in",
        type: "Sign In",
    },
    {
        isSuccess: false,
        title: "Passwords validation",
        type: "FailureChangingPassword",
    },
    {
        isSuccess: true,
        title: "Passwords validation",
        type: "SuccessfulChangingPassword",
    },
    {
        isSuccess: false,
        title: "Manager validation",
        type: "FailureEditingManager",
    },
    {
        isSuccess: true,
        title: "Manager validation",
        type: "SuccessfulEditingManager",
    },
    {
        isSuccess: false,
        title: "Client validation",
        type: "FailureEditingClient",
    },
    {
        isSuccess: true,
        title: "Client validation",
        type: "SuccessfulEditingClient",
    },
    {
        isSuccess: false,
        title: "Loan validation",
        type: "FailureCreatingLoan",
    },
    {
        isSuccess: true,
        title: "Loan validation",
        type: "SuccessfulCreatingLoan",
    },
    {
        isSuccess: false,
        title: "Loan validation",
        type: "FailureEditingLoan",
    },
    {
        isSuccess: true,
        title: "Loan validation",
        type: "SuccessfulEditingLoan",
    },
];

/**
 * @param {string} message
 * @param {string} type
 * @return {null}
 */
const buildNotification = (message, type) => {
    const notification = types.find(e => e.type === type);

    return notification
        ? executeBuildingNotification(message, notification.title, notification.isSuccess)
        : null;
};

export default {
    buildNotification
};
