interface IImageInfo {
    predictResult: {
        bbox: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        gender: 'Male' | 'Female' | string;
        age: string;
    }[];
    imageName: string;
    imageSize: {
        width: number;
        height: number;
    };
    createdAt: string;
    predictTime: string;
    _id: string;
}

export default IImageInfo;
