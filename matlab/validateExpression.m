function validationResult = validateExpression(expression, symbolsToCheck)
    validationResult = struct();

    validationResult.isValid = true;
    validationResult.message = '';

    try
        symbolicExpression = str2sym(expression);

        symbolsInExpression = symvar(symbolicExpression);

        isExpressionContainOnlyAllowedDefinitions = all(ismember(symbolsInExpression, symbolsToCheck));

        if isExpressionContainOnlyAllowedDefinitions
            validationResult.isValid = true;
            validationResult.message = '';
        else
            validationResult.isValid = false;
            validationResult.message = 'The string contains variables that are not known to the system';
        end
    catch
        validationResult.isValid = false;
        validationResult.message = 'The string is not a valid symbolic expression';
    end
end
