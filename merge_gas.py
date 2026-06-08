# merge_gas.py - Python script to automatically merge HTML, CSS, and JS files for GAS deployment
import os

def merge_version(base_dir, output_file, is_v2=False):
    index_path = os.path.join(base_dir, 'index.html')
    style_path = os.path.join(base_dir, 'style.css')
    script_path = os.path.join(base_dir, 'script.js')
    output_path = os.path.join(base_dir, output_file)

    if not os.path.exists(index_path):
        print(f"Error: {index_path} does not exist.")
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()

    with open(style_path, 'r', encoding='utf-8') as f:
        css = f.read()

    with open(script_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # Use standard string replace to avoid regex backslash escaping issues in js/css code
    css_target = '<link rel="stylesheet" href="style.css">'
    css_replacement = f'<style>\n{css}\n</style>'
    
    js_target = '<script src="script.js"></script>'
    js_replacement = f'<script>\n{js}\n</script>'

    if css_target in html:
        html = html.replace(css_target, css_replacement)
    else:
        # fallback check for single quotes or spaces
        print(f"Warning: '{css_target}' not found in {index_path}. Trying variant...")
        html = html.replace("<link rel='stylesheet' href='style.css'>", css_replacement)

    if js_target in html:
        html = html.replace(js_target, js_replacement)
    else:
        # fallback check for single quotes
        print(f"Warning: '{js_target}' not found in {index_path}. Trying variant...")
        html = html.replace("<script src='script.js'></script>", js_replacement)

    # For v2, replace local mascot image with online URL so it renders properly in GAS iframe
    if is_v2:
        html = html.replace('src="chef_logo.png"', 'src="https://falo-taiwan.github.io/demo/bentov2/chef_logo.png"')

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"Successfully merged {base_dir} into {output_path}")

if __name__ == '__main__':
    merge_version('bento/v1', 'gas_deploy.html', is_v2=False)
    merge_version('bentov2', 'gas_deploy.html', is_v2=True)
