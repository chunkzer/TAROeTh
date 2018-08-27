### Security Considerations:

To prevent overflow / underflow exploits, most math operations in this app are done with SafeMath.

Care has been taken with operations that involve ETH movements for they to be triggered by PULL operations over PUSH operations to avoid many common pitfalls. Additionally any transfer operations occur only after all of the business logic and balance settling has resolved, this is to avoid reentrancy attacks.
