"""empty message

Revision ID: 219ee38ec78a
Revises: 5f8e8abdc57f
Create Date: 2024-01-24 19:07:11.637995

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '219ee38ec78a'
down_revision = '5f8e8abdc57f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_is_activated', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('_is_activated')

    # ### end Alembic commands ###
