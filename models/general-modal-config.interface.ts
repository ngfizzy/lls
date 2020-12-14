export interface GeneralModalConfig {
    handleClose: () => any;
    title: string;
    show: boolean;
    size: 'sm' | 'lg' | undefined;
    controls: 'closeOnly' | undefined;
}