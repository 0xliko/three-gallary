import * as THREE from "three";
export interface IProps{
    [key:string]:any
}
export interface IImage{
    position: THREE.Vector3,
    rotation: THREE.Vector3,
    url: string,
    dropletUrl: string
}
export interface IAppPageProps{
    images: IImage[]
}
export interface IFramesProps{
    images: IImage[],
    q?:THREE.Quaternion,
    p?: THREE.Vector3
}
export interface IFrameProps extends IImage{
    selectedFrameId: string | undefined,
    url: string,
    index: number,
    c?:  THREE.Color | undefined
}
