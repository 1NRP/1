{
  description = "A flake for my project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flakeSupport.url = "github:edolstra/flake-parts";
  };

  outputs = { self, nixpkgs, flakeSupport }:
    flakeSupport.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs-18_x
            pkgs.npm
            pkgs.idx
          ];
        };
        
       
      }
    );
}