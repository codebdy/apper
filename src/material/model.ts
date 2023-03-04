import React from "react";

export interface Material {
  name: string;
  designer: any;
  component: any;
}

export interface MaterialGroup {  
  uuid: string;
  title: string;
  materials: Material[];
}


export interface MaterialTab {
  title: string,
  uuid: string,
  groups: MaterialGroup[],
}