def loop():
    for i in range(10):
        pass

def py_loop():
    for i in range(10):
        pass

def py_loop_typed():
    cdef int i
    for i in range(10):
        pass

cpdef cpy_loop():
    for i in range(10):
        pass

cpdef cpy_loop_typed():
    cdef int i
    for i in range(10):
        pass

cdef c_loop():
    cdef int i
    for i in range(10):
        pass