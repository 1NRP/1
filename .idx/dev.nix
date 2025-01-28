{ pkgs, ... }: {
  channel = "stable-24.05";

# Add packages.
  packages = [
    pkgs.nodejs_20
    ];
  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = {
      # Configure web previews
      web = {
        command = [
          "npm"
          "run"
          "serve"
          "-p"
          #"--"
          #"--port"
          "$PORT"
          #"--host"
          #"0.0.0.0"
          #"--disable-host-check"
        ];
        manager = "web";
        # Optionally, specify the directory where your web app resides
        #cwd = "app";  # This points to the directory containing your web app (e.g., React, Vue, etc.)
      };
    };
  };
}