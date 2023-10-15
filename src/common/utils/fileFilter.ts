export const fileFilter = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  return callback(null, true);
  // Object.values(imageType).includes(file.mimetype)
  //   ? callback(null, true)
  //   : callback(
  //     new BadRequestException(`${file.mimetype} format is unsupported`),
  //     false,
  //   );
};
