export function getAvatarImage(img = null, folderName, name = 'Mehedi Hasan') {
    if (img) {
        return `/uploads/${folderName}/${img}`;
    } else if (img === null && name) {
        return `https://avatar.iran.liara.run/username?username=${name}`;
    }
    return null;
}
