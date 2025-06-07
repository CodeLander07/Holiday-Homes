module.exports = (fn) =>
{
    return (req , res , next) =>
    {
        fn(req, res, next).catch(next);
    }
}
// export default wrapAsync;
// This function takes an async function `fn` and returns a new function that wraps the original function.