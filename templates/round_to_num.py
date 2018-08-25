day = 86400000

def roundup_length(self, starting_time, length):

    def roundup(x, roundnmbr):
        return x if x % roundnmbr == 0 else x + roundnmbr - x % roundnmbr

    expiration = roundup( (starting_time + length * day) , 3600000)

    return expiration

def roundup(x, roundnmbr):
    return x if x % roundnmbr == 0 else x + roundnmbr - x % roundnmbr

def roundup2(starting_time, length):
    x = starting_time + length * day
    return x + 3600000 - x % 3600000

def roundtest(x, roundnum):
    return x + roundnum - x % roundnum

print(roundtest(141, 35))
