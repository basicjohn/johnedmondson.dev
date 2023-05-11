import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import AnimatedBackground from "../AnimatedBackground";

let container: Element | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container as Element);
  container?.remove();
  container = null;
});

jest.mock("three", () => ({
  Scene: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
  })),
  OrthographicCamera: jest.fn(),
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    setSize: jest.fn(),
    domElement: document.createElement("div"),
  })),
  BufferGeometry: jest.fn(),
  BufferAttribute: jest.fn(),
  CircleGeometry: jest.fn(),
  BoxGeometry: jest.fn(),
  MeshBasicMaterial: jest.fn(),
  Color: jest.fn(),
  Mesh: jest.fn().mockImplementation(() => ({
    position: { set: jest.fn() },
    rotation: {},
    userData: {},
  })),
  Vector2: jest.fn(),
}));

describe("AnimatedBackground", () => {
  it("renders without crashing", () => {
    render(<AnimatedBackground />, container as Element);
  });
});
