export const load = async ({ url }) => {
  return {
    propsFromLayout: { pathname: url.pathname },
  };
};
