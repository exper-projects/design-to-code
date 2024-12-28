import base64


def read_from_file(file_path) -> str:
    with open(file_path, "r") as file:
        return file.read()


def write_to_file(file_path, content):
    with open(file_path, "w") as file:
        file.write(content)


def encode_base64(text: str) -> str:
    b = base64.b64encode(bytes(text, 'utf-8'))
    return b.decode('utf-8')


def decode_base64_to_file(base64_string: str, file_path):
    with open(file_path, "wb") as output_file:
        decoded_data = base64.b64decode(base64_string)
        output_file.write(decoded_data)


def unescape_string(text: str) -> str:
    return bytes(text, 'utf-8').decode('unicode_escape')
