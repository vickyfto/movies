import '@testing-library/jest-dom/vitest'

class IntersectionObserverStub {
    observe() { }
    unobserve() { }
    disconnect() { }
}
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: IntersectionObserverStub,
})