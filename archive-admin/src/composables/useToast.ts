import { toast } from 'vue-sonner'

export function useToast() {
    const success = (title: string, description?: string) => {
        toast.success(title, { description })
    }

    const error = (title: string, description?: string) => {
        toast.error(title, { description })
    }

    const info = (title: string, description?: string) => {
        toast.info(title, { description })
    }

    const warning = (title: string, description?: string) => {
        toast.warning(title, { description })
    }

    return {
        success,
        error,
        info,
        warning
    }
}
