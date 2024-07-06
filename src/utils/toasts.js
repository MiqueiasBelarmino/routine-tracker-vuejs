import { useNotification, notify } from 'vue-modern-notification';
const toast = useNotification();
const defaultPosition = 'bottom-center';
const defaultDuration = 5000;

export const primary = (options) => {
    notify({
        color: 'primary',
        square: true,
        position: options.position ?? defaultPosition,
        title: options.title ?? '',
        text: options.text ?? '',
        duration: defaultDuration
    });
}

export const success = (options) => {
    notify({
        color: 'success',
        square: true,
        position: options.position ?? defaultPosition,
        title: options.title ?? '',
        text: options.text ?? '',
        duration: defaultDuration
    });
}

export const warning = (options) => {
    notify({
        color: 'warning',
        square: true,
        position: options.position ?? defaultPosition,
        title: options.title ?? '',
        text: options.text ?? '',
        duration: defaultDuration
    });
}

export const error = (options) => {
    notify({
        color: 'danger',
        square: true,
        position: options.position ?? defaultPosition,
        title: options.title ?? '',
        text: options.text ?? '',
        duration: defaultDuration
    });
}
