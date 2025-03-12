import os

def writeCodeInFile(fileName: str, code: str):
    path = os.path.abspath(f"../client/{fileName}")
    f = open(path,"w")
    f.write(code)
    f.close()
