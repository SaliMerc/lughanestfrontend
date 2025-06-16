export function generateSlug(...parts) {
  return parts
    .join(' ') 
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)/g, ''); 
}


// for uppercasing the first letter 
export function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

