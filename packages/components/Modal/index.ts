import { App, Component, createApp, h } from 'vue'
import ModalComponent from './modal.vue'

interface ModalOptions {
  title?: string
  content?: string | Component
  confirmText?: string
  cancelText?: string
  showBtn?: boolean
  defaultClose?: boolean
  draggable?: boolean
  className?: string
  onClose?: (obj?: any) => void
  onConfirm?: (obj?: any) => void
}

let modalInstance: App<Element> | null = null
let container: Element

export const Modal = {
  open(options: ModalOptions) {
    if (modalInstance) this.close() // 关闭已存在的模态框
    container = document.createElement('div')
    document.body.appendChild(container)

    modalInstance = createApp({
      render() {
        return h(ModalComponent, {
          showBtn: true,
          draggable: true,
          ...options,
          onClose: (obj: any) => {
            options?.onClose?.(obj)
            Modal.close()
          },
          onConfirm: (obj: any) => {
            options?.onConfirm?.(obj)
            if (options.defaultClose) {
              Modal.close()
            }
          },
        })
      },
      destroy() {
        modalInstance?.unmount()
        document.body.removeChild(container)
        modalInstance = null
      },
    })

    modalInstance.mount(container)
  },
  close() {
    document.body.removeChild(container)
    modalInstance?.unmount()
    modalInstance = null
  },
}
