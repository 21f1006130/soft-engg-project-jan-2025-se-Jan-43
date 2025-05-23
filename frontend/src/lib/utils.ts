import type { Updater } from '@tanstack/vue-table'
import { type ClassValue, clsx } from 'clsx'
import type { Ref } from 'vue'
import { twMerge } from 'tailwind-merge'
import { type Router } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'
import router from '@/router'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}
export function getURL(url: string) {
  return import.meta.env.VITE_BACKEND_URL + url
}

export function checkIsAuthenticated() {
  if (!(sessionStorage.getItem('isAuthenticated') === 'true')) {
    router.push('/login')
  }
}
export function authenticationGuard(router: Router) {
  if (!(sessionStorage.getItem('isAuthenticated') === 'true')) {
    return false
  }
  return true
}

export function checkResponse(response: any) {
  if (!response.ok) {
    if (response.status === 401 || response.status === 422) {
      const { toast } = useToast()
      toast({
        title: 'You are not logged in.',
        description: 'You will be redirected to the login screen in a few seconds.',
        variant: 'destructive',
      })
      sessionStorage.setItem('isAuthenticated', 'false')
      sessionStorage.removeItem('accessToken')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
      // throw new Error('Unauthorized')
    }
    // console.error(response.status)
  }
}

export const deepchatStyles = {
  chatStyle: {
    borderRadius: '0rem 0rem 1rem 1rem',
    borderColor: 'rgb(159, 51, 45)',
    backgroundColor: 'rgb(241, 245, 249)',
    'z-index': '9999',
    paddingTop: '1rem',
    width: '100%',
    height: '600px',
  },
  textInput: {
    styles: {
      container: {
        borderRadius: '20px',
        border: '1px solid #969696',
        boxShadow: 'unset',
        width: '78%',
        marginLeft: '-15px',
        maxWidth: '400px',
      },
      text: { padding: '10px', paddingLeft: '15px', paddingRight: '34px' },
    },
    placeholder: { text: 'Enter a prompt here', style: { color: '#bcbcbc' } },
  },
  messageStyles: {
    default: {
      shared: {
        bubble: {
          maxWidth: '100%',
          backgroundColor: 'unset',
          marginBottom: '20px',
          'overflow-x': 'auto',
        },
        innerContainer: {
          marginTop: '10px',
        },
      },
      user: {
        bubble: { marginLeft: '0px', color: 'black' },
        innerContainer: { borderRadius: '15px' },
      },
      ai: { innerContainer: { borderRadius: '15px', backgroundColor: 'white' } },
    },
  },
  avatars: {
    default: {
      styles: { position: 'left', container: { marginLeft: '12px', marginRight: '5px' } },
    },
    ai: {
      src: '/googleBardLogo.png',
      styles: { position: 'left', avatar: { paddingTop: '6px' } },
    },
  },
  speechToText: {
    button: {
      default: {
        container: {
          default: {
            bottom: '1em',
            right: '0.6em',
            borderRadius: '20px',
            width: '1.9em',
            height: '1.9em',
          },
        },
        svg: { styles: { default: { bottom: '0.35em', left: '0.35em' } } },
      },
      position: 'inside-right',
    },
  },
  submitButtonStyles: {
    position: 'outside-right',
    submit: {
      container: {
        default: {
          bottom: '0.9em',
          borderRadius: '25px',
          padding: '6px 5px 4px',
          backgroundColor: '#f3f6fc',
        },
        hover: { backgroundColor: '#b0deff4f' },
        click: { backgroundColor: '#b0deffb5' },
      },
      //   svg: {
      //     content:
      //       '<?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?> <svg viewBox=&quot;0 0 24 24&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path d=&quot;m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z&quot;/></svg>',
      //     styles: {
      //       default: {
      //         width: '1.5em',
      //         filter:
      //           'brightness(0) saturate(100%) invert(10%) sepia(86%) saturate(6044%) hue-rotate(205deg) brightness(100%) contrast(100%)',
      //       },
      //     },
      //   },
    },
    loading: {
      svg: {
        styles: {
          default: {
            filter:
              'brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%) contrast(96%)',
          },
        },
      },
    },
    stop: {
      container: { hover: { backgroundColor: '#ededed' } },
      svg: {
        styles: {
          default: {
            filter:
              'brightness(0) saturate(100%) invert(59%) sepia(0%) saturate(0%) hue-rotate(348deg) brightness(96%) contrast(93%)',
          },
        },
      },
    },
  },
}
